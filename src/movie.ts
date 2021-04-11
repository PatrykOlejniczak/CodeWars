export class G964 {
    public static movie(card: number, ticket: number, perc: number): number {
        let wachedMovies = 0;
        let systemA = 0;
        let systemB = card;
        let currentPrice = ticket;
        while (systemA <= Math.ceil(systemB)) {
            wachedMovies++;
            systemA += ticket;
            currentPrice *= perc;
            systemB += currentPrice;
        }

        return wachedMovies;
    };
}