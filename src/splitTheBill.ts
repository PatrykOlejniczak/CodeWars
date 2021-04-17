export function splitTheBill(x: { [k: string]: number }): { [k: string]: number } {
    var sum = 0;
    for (let element of Object.values(x)) {
        sum += element;
    }

    var perFriend = sum / Object.values(x).length;
    for (let element of Object.keys(x)) {
        x[element] = Math.floor((x[element] - perFriend) * 100) / 100;
    }

    return x;
}