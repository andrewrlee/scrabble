export type Lookup = Record<string, string[]>

export const sortLetters = (word: string) => word.split("").sort().join('')

export const buildLookup = (dict: string): Lookup => dict
    .split("\n")
    .filter(line => line)
    .map(word => [sortLetters(word), word])
    .reduce((acc: Lookup, [key, value]) => {
        acc[key] = acc[key] ? [...acc[key], value] : [value];
        return acc
    }, {})

export const getAnagrams = (lookup: Lookup, word: string) => lookup[sortLetters(word)] || []

export const isValidScrabbleWord = (lookup: Lookup, word: string) => Boolean(getAnagrams(lookup, word).find(w => w === word))

export const getCandidateWords = (lookup: Lookup, currentWord: string, trayOptions: string[]): string[] =>
    trayOptions.flatMap(combo =>
        getAnagrams(lookup, currentWord + combo)
            .filter(result => result !== currentWord) // can't play same word 
            .filter(result => result.includes(currentWord))) // new chars go around existing word 

// All possible unique combos you can play from the tray: 'aba' => '', 'a', 'ab', 'b', 'aa', 'aab'
export const trayOptions = (tray: string) => getPowerSet(tray.split(""))

export const getPowerSet = <A>(as: A[]): string[] => {
    const subsets: A[][] = [[]];
    for (const a of as) {
        subsets.map((el, i) => {
            subsets.push([...el, a])
        });
    }
    return [...new Set(subsets.map(as => as.sort().join("")))];
};
