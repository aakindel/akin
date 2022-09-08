import HeroIcons from "@/design_systems/mainds/components/icons/heroicons";
import IconButtonStyles from "./IconButton.module.scss";

type IconButtonProps = {
  type?: "minimal";
  icon: "twitter" | "sun" | "moon";
  onClick?: React.MouseEventHandler<HTMLElement>;
};

const IconButton = ({ type = "minimal", icon, onClick }: IconButtonProps) => {
  let iconSvg = null;
  switch (icon) {
    case "sun":
      iconSvg = <HeroIcons icon="sun" />;
      break;
    case "moon":
      iconSvg = <HeroIcons icon="moon" />;
      break;
  }
  return (
    <div className={IconButtonStyles["icon-button-scope"]}>
      <button
        className={`${IconButtonStyles[`icon-button`]} ${
          IconButtonStyles[`icon-button-${icon}`]
        } ${IconButtonStyles[`${type}`]}`}
        onClick={onClick}
      >
        {iconSvg}
      </button>
    </div>
  );
};

export default IconButton;
