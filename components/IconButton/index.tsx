import HeroIcons, {
  HeroIconNames,
  isHeroIcon,
} from "@/design_systems/mainds/components/icons/heroicons";
import SocialIcons, {
  SocialIconNames,
} from "@/design_systems/mainds/components/icons/social/simpleicons";
import IconButtonStyles from "./IconButton.module.scss";

type IconButtonProps = {
  type?: "minimal" | "hover";
  icon: HeroIconNames | SocialIconNames;
  onClick?: React.MouseEventHandler<HTMLElement>;
};

const IconButton = ({ type = "minimal", icon, onClick }: IconButtonProps) => {
  let iconSvg = null;
  switch (icon) {
    case icon:
      iconSvg = isHeroIcon(icon) ? (
        <HeroIcons icon={icon as HeroIconNames} />
      ) : (
        <SocialIcons icon={icon as SocialIconNames} />
      );
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
