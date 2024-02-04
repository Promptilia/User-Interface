export const removeBackTicks = (str: string) => {
    return str.replace(/```/g, '')
}