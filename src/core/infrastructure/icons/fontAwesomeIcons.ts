import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(fas, far);

const allIcons = { ...fas, ...far};

export const iconList = Object.keys(allIcons).map((iconName) => ({
    prefix: allIcons[iconName].prefix,
    iconName: allIcons[iconName].iconName,
}));
 