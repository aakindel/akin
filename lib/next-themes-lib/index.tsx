// adapted from https://github.com/pacocoursey/next-themes

import useLocalStorageState from "@/hooks/useLocalStorageState";
import collapseString from "@/utils/collapseString";
import { readLocalStorageValue } from "@/utils/localStorage";
import React, {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  memo,
} from "react";
import type { UseThemeProps, ThemeProviderProps } from "./types";

const colorSchemes = ["light", "dark"];
const MEDIA = "(prefers-color-scheme: dark)";
const ThemeContext = createContext<UseThemeProps | undefined>(undefined);
const defaultContext: UseThemeProps = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTheme: (_) => {
    return;
  },
  themes: [],
};

export const useTheme = () => useContext(ThemeContext) ?? defaultContext;

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const context = useContext(ThemeContext);

  // Ignore nested context providers, just passthrough children
  if (context) return <Fragment>{props.children}</Fragment>;
  return <Theme {...props} />;
};

const Theme: React.FC<ThemeProviderProps> = ({
  forcedTheme,
  disableTransitionOnChange = false,
  enableSystem = true,
  enableColorScheme = true,
  storageKey = "theme",
  themes = ["light", "dark"],
  defaultTheme = enableSystem ? "system" : "light",
  attribute = "data-theme",
  value,
  children,
  nonce,
}) => {
  const retrievedTheme = readLocalStorageValue(storageKey, true);

  // useLocalStorageState to update localstorage whenever state is updated
  const [theme, setThemeState] = useLocalStorageState(
    storageKey,
    defaultTheme,
    true
  );

  // useState to decouple state from localstorage
  const [resolvedTheme, setResolvedTheme] = useState<
    // https://stackoverflow.com/a/62900613 : type from string array
    typeof themes[number] | undefined
  >(retrievedTheme as string | undefined);

  const themeClasses = themes;

  const applyTheme = useCallback(
    (theme: string) => {
      let resolved = theme;
      if (!resolved) return;

      // If theme is system, resolve it before setting theme
      if (theme === "system" && enableSystem) {
        resolved = getSystemTheme();
      }

      const themeClass = resolved;
      const themeAttribute = resolved;
      const enable = disableTransitionOnChange ? disableAnimation() : null;
      const rootElement = document.documentElement;

      if (attribute === "class") {
        rootElement.classList.remove(...themeClasses);

        if (themeClass) rootElement.classList.add(themeClass);
      } else {
        if (themeAttribute) {
          rootElement.setAttribute(attribute, themeAttribute);
        } else {
          rootElement.removeAttribute(attribute);
        }
      }

      if (enableColorScheme) {
        const fallback = colorSchemes.includes(defaultTheme)
          ? defaultTheme
          : null;
        const colorScheme = colorSchemes.includes(resolved)
          ? resolved
          : fallback;
        rootElement.style.colorScheme = colorScheme as string;
      }

      enable?.();
    },
    [
      attribute,
      defaultTheme,
      disableTransitionOnChange,
      enableColorScheme,
      enableSystem,
      themeClasses,
    ]
  );

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = getSystemTheme(e);
      setResolvedTheme(resolved);

      if (theme === "system" && enableSystem && !forcedTheme) {
        applyTheme("system");
      }
    },
    [theme, enableSystem, forcedTheme, applyTheme]
  );

  // Always listen to System preference
  useEffect(() => {
    const media = window.matchMedia(MEDIA);

    // Intentionally use deprecated listener methods to support iOS & old browsers
    media.addListener(handleMediaQuery);
    handleMediaQuery(media);

    return () => media.removeListener(handleMediaQuery);
  }, [handleMediaQuery]);

  // localStorage event handling
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== storageKey) {
        return;
      }

      // If default theme set, use it if localstorage === null (happens on local storage manual deletion)
      const theme = e.newValue || defaultTheme;
      setThemeState(theme);
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [defaultTheme, setThemeState, storageKey]);

  // Whenever theme or forcedTheme changes, apply it
  useEffect(() => {
    applyTheme(forcedTheme ?? (theme as string));
  }, [applyTheme, forcedTheme, theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: setThemeState,
        forcedTheme,
        resolvedTheme: theme === "system" ? resolvedTheme : theme,
        themes: enableSystem ? [...themes, "system"] : themes,
        systemTheme: (enableSystem ? resolvedTheme : undefined) as
          | "light"
          | "dark"
          | undefined,
      }}
    >
      <ThemeScript
        {...{
          forcedTheme,
          disableTransitionOnChange,
          enableSystem,
          enableColorScheme,
          storageKey,
          themes,
          defaultTheme,
          attribute,
          value,
          children,
          themeClasses,
          nonce,
        }}
      />
      {children}
    </ThemeContext.Provider>
  );
};

const ThemeScript = memo(
  ({
    forcedTheme,
    storageKey,
    attribute,
    enableSystem,
    enableColorScheme,
    defaultTheme,
    value,
    themeClasses,
    nonce,
  }: ThemeProviderProps & { themeClasses: string[]; defaultTheme: string }) => {
    const defaultSystem = defaultTheme === "system";

    const optimization = (() => {
      if (attribute === "class") {
        const removeClasses = `c.remove(${themeClasses
          .map((t: string) => `'${t}'`)
          .join(",")})`;

        return `var d=document.documentElement,c=d.classList;${removeClasses};`;
      } else {
        return `var d=document.documentElement,n='${attribute}',s='setAttribute';`;
      }
    })();

    const fallbackColorScheme = (() => {
      if (!enableColorScheme) {
        return "";
      }

      const fallback = colorSchemes.includes(defaultTheme)
        ? defaultTheme
        : null;

      if (fallback) {
        return collapseString(
          `if(e==='light'||e==='dark'||!e)d.style.colorScheme=e||'${defaultTheme}'`
        );
      } else {
        return collapseString(
          `if(e==='light'||e==='dark')d.style.colorScheme=e`
        );
      }
    })();

    const updateDOM = (
      name: string,
      literal = false,
      setColorScheme = true
    ) => {
      const resolvedName = value ? value[name] : name;
      const val = literal ? name + `|| ''` : `'${resolvedName}'`;
      let text = "";

      // MUCH faster to set colorScheme alongside HTML attribute/class
      // as it only incurs 1 style recalculation rather than 2
      // This can save over 250ms of work for pages with big DOM
      if (
        enableColorScheme &&
        setColorScheme &&
        !literal &&
        colorSchemes.includes(name)
      ) {
        text += `d.style.colorScheme = '${name}';`;
      }

      if (attribute === "class") {
        if (literal || resolvedName) {
          text += `c.add(${val})`;
        } else {
          text += `null`;
        }
      } else {
        if (resolvedName) {
          text += `d[s](n,${val})`;
        }
      }

      return text;
    };

    const scriptSrc = (() => {
      if (forcedTheme) {
        return collapseString(
          `!function(){
            ${optimization}
            ${updateDOM(forcedTheme)}
          }()`
        );
      }

      if (enableSystem) {
        return collapseString(
          `!function(){
            try {
              ${optimization}
              var e=localStorage.getItem('${storageKey}');
              if('system'===e||(!e&&${defaultSystem})){
                var t='${MEDIA}',m=window.matchMedia(t);
                if(m.media!==t||m.matches){
                  ${updateDOM("dark")}
                } else {
                  ${updateDOM("light")}
                }
              } else if (e) {
                ${value ? `var x=${JSON.stringify(value)};` : ""}
                ${updateDOM(value ? `x[e]` : "e", true)}
              }${
                !defaultSystem
                  ? `else {` + updateDOM(defaultTheme, false, false) + "}"
                  : ""
              }${fallbackColorScheme}
            } catch(e){}}()`
        );
      }

      return collapseString(
        `!function(){try{${optimization}var e=localStorage.getItem('${storageKey}');if(e){${
          value ? `var x=${JSON.stringify(value)};` : ""
        }${updateDOM(value ? `x[e]` : "e", true)}}else{${updateDOM(
          defaultTheme,
          false,
          false
        )};}${fallbackColorScheme}}catch(t){}}();`
      );
    })();

    return (
      <script nonce={nonce} dangerouslySetInnerHTML={{ __html: scriptSrc }} />
    );
  },
  // Never re-render this component
  () => true
);

ThemeScript.displayName = "ThemeScripts";

// Helpers

const disableAnimation = () => {
  const css = document.createElement("style");
  css.appendChild(
    document.createTextNode(
      collapseString(`*{
        -webkit-transition:none!important;
        -moz-transition:none!important;
        -o-transition:none!important;
        -ms-transition:none!important;
        transition:none!important
      }`)
    )
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
};

const getSystemTheme = (e?: MediaQueryList | MediaQueryListEvent) => {
  if (!e) e = window.matchMedia(MEDIA);
  const isDark = e.matches;
  const systemTheme = isDark ? "dark" : "light";
  return systemTheme;
};
