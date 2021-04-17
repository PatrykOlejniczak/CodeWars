export function transposeTwoStrings(arr: string[]): string {
    var lines = Math.max(...arr.map(el => el.length))
    var output = "";

    for (var i = 0; i < lines; i++) {
        var line = "";
        for (var j = 0; j < arr.length; j++) {
            var character = arr[j][i] != undefined ? arr[j][i] : " ";
            line += character;
            if (j < arr.length - 1)
                line += " ";
        }

        output += line;
        if (i < lines - 1) {
             output += '\n';
        }
    }

    return output;
}