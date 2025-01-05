

export const getYearAgoTime = (): string => {
    var now = new Date();
    var yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    return (
        yearAgo.getFullYear() +
        "-" +
        String(yearAgo.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(yearAgo.getDate()).padStart(2, "0")
    );
};

export const getTimeBefore = (days: number): string => {
    var now = new Date();
    var before = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);
    return (
        before.getFullYear() +
        "-" +
        String(before.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(before.getDate()).padStart(2, "0")
    );
}