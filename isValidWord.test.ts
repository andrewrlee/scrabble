import fs from 'fs'
import { Lookup, buildLookup, isValidScrabbleWord, getAnagrams, getCandidateWords, getPowerSet, trayOptions } from './isValidWord'

describe('isValidWord ', () => {
    let lookup: Lookup

    const toDictString = (words: string[]) => words.join('\n')

    beforeEach(async () => {
        const dict = await fs.readFileSync('./input/dict.txt')
        lookup = buildLookup(dict.toString())
    })

    describe('build lookup ', () => {
        test('build small lookup', () => {
            const dict = toDictString(['bat', 'and', 'cat', 'dan', 'tab', 'dna'])

            expect(buildLookup(dict)).toStrictEqual({
                'adn': ['and', 'dan', 'dna'],
                'abt': ['bat', 'tab',],
                'act': ['cat']
            })
        })

        test('read whole dictionary', async () => {
            expect(Object.keys(lookup).length).toBe(161019)
        })
    })

    describe('isValidWord ', () => {
        test('valid word when not anagram', () => {
            expect(isValidScrabbleWord(buildLookup('abc'), 'abc')).toBe(true)
        })

        test('not a valid word', () => {
            expect(isValidScrabbleWord(buildLookup('bat'), 'acb')).toBe(false)
        })

        test('valid word when is anagram', () => {
            expect(isValidScrabbleWord(buildLookup(toDictString(['abc', 'acb'])), 'acb')).toBe(true)
        })

        test('invalid word when is anagram', () => {
            expect(isValidScrabbleWord(buildLookup(toDictString(['abc'])), 'acb')).toBe(false)
        })
    })


    describe('getAnagrams', () => {
        test('No anagrams', () => {
            expect(getAnagrams(buildLookup(toDictString(['abc', 'acb'])), 'bat')).toStrictEqual([])
        })

        test('Has anagrams', () => {
            expect(getAnagrams(buildLookup(toDictString(['abc', 'acb'])), 'abc')).toStrictEqual(['abc', 'acb'])
        })
    })

    describe('getPowerSet', () => {
        test('to power set', () =>
            expect(getPowerSet(['a', 'b', 'c', 'd'])).toStrictEqual(["", "a", "b", "ab", "c", "ac", "bc", "abc", "d", "ad", "bd", "abd", "cd", "acd", "bcd", "abcd"])
        )
        test('break to power set', () =>
            expect(getPowerSet(['1', '2', '1'])).toStrictEqual(["", "1", "2", "12", "11", "112",])
        )
        test('aba', () => {
            expect(getPowerSet(['a', 'b', 'a'])).toStrictEqual(["", "a", "b", "ab", "aa", "aab",])
        })
    })

    describe('Find candidate words', () => {
        test('need to have additional chars to make new words', () => {
            expect(getCandidateWords(lookup, 'read', trayOptions(''))).toStrictEqual([])
        })

        test('with anagrams', () => {
            expect(getCandidateWords(lookup, 'oo', trayOptions('pl'))).toStrictEqual(['poo', 'loo', 'loop', 'pool'])
        })

        test('Although ready has many anagrams the only valid option is ready as it constains "read" in the correct order', () => {
            expect(getAnagrams(lookup, 'ready')).toStrictEqual(["deary", "deray", "rayed", "ready",])
            expect(getCandidateWords(lookup, 'read', trayOptions('y'))).toStrictEqual(['ready'])
        })

        test('when adding additional letter to prefix', () => {
            expect(getCandidateWords(lookup, 'read', trayOptions('b'))).toStrictEqual(['bread'])
        })

        test('when adding additional letter to suffix', () => {
            expect(getCandidateWords(lookup, 'read', trayOptions('y'))).toStrictEqual(['ready'])
        })

        test('Doesnt need to use all letters in the tray', () => {
            expect(getCandidateWords(lookup, 'read', trayOptions('bc'))).toStrictEqual(['bread'])
        })

        test('Produces a few candidates', () => {
            expect(getCandidateWords(lookup, 'read', trayOptions('by'))).toStrictEqual(['bread', 'ready', 'bready'])
        })

        test('Produces lots of candidates', () => {
            expect(getCandidateWords(lookup, 'rea', trayOptions('brdslya'))).toStrictEqual(["rear", "read", "bread", "drear", "rears", "reads", "breads", "drears", "real", "reals", "ready", "bready", "dreary", "area", "areas", "areal", "already", "readably",])
        })
    })
})