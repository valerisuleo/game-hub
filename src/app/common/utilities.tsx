export function capitalizeFirstLetter(labelText: string): string {
    if (!labelText) return labelText;
    return labelText.charAt(0).toUpperCase() + labelText.slice(1).toLowerCase();
}
