export const formatIconName = (iconName: string): string => {
    return iconName
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('');
};