export const dim = {
    1:31,
    2: new Date().getFullYear() % 4 == 0 ? 29 : 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
}

export function calcAge(dateOfBirth: Date): string {
    let dOB: Date = new Date(dateOfBirth);
    let now: Date = new Date();
    let years: number = now.getFullYear() - dOB.getFullYear() - 1;
    let months: number = 12 - dOB.getMonth() - now.getMonth();
    let days: number = now.getDate() - dOB.getDate();
    return `${years}.${months}.${days}`
}