## Overall Instructions

We will work through this problem with you in a structured interview. We don't expect you to bring a solution to the interview, but rather to talk us through how you would solve the problem - and write some code examples.

## Scrabble

### Problem description

Create a program to find the best move in a game of scrabble. This is a test
of your ability to design and implement an algorithm to solve a problem. Unlike
with the rest of the challenge - we request that you implement an algorithm to
solve this part rather than using a library.

It is also designed to be harder - we do not expect everyone to whom we would
offer a position to be able to solve it fully.

The input to your challenge is a
[Scrabble](https://en.wikipedia.org/wiki/Scrabble) board and a panel of letter
tiles.
These are both detailed in a single file, where the last line describes your
panel of letter tiles, and the rest of the file describes the scrabble board.

For example, imagine your tiles are `panelyy` and the board is as shown below:
![Scrabble Board](https://static.vecteezy.com/system/resources/previews/000/090/550/original/scrabble-board-free-fector-vector.jpg)

The corresponding input file would be:

```
---------------
---------------
---------------
--------smile--
-----------a---
-----------u---
-----------g-h-
-------birthday
-------------p-
-------------p-
-------------y-
---------------
---------------
---------------
---------------
panelyy
```

Your task is to find what to add to the board from your panel to achieve the
highest score possible. Your output should be formed as
`(x_start,y_start,vertical,word)`, where `x_start` and `y_start` are integer
coordinates of the first tile of the word, `vertical` is a boolean (true if the
word is vertical), and `word` is a string.

The scores for each letter are:

```
1:EAIONRTLSU
2:DG
3:BCMP
4:FHVWY
5:K
8:JX
10:QZ
```

Your solution should be a "play" as if it were your turn in Scrabble, using only
the letters available to you in your panel.

To quote the Scrabble Wikipedia article:

> A proper play uses one or more of the player's tiles to form a continuous
> string of letters that make a word (the play's "main word") on the board,
> reading either left-to-right or top-to-bottom. The main word must either use the
> letters of one or more previously played words or else have at least one of its
> tiles horizontally or vertically adjacent to an already played word. If any
> words other than the main word are formed by the play, they are scored as well,
> and are subject to the same criteria of acceptability.

For the above board with the panel "panelyy", one of the top-scoring solutions
is "yay", when placed vertically such that the last "y" makes the word
"smiley", with a score of 20.

The score of your move is calculated as the **sum of the score of every new word
which you create** as a result of your move. In this example move, the words
"smiley" and "yay" are created. "smiley" has a score of **11**, and "yay" has a
score of **9**. The total score for this move is therefore **20**. Note that
the **'y'** at the end of "smiley" and at the start of "yay" is counted
**twice**, once for each word.

### Example

**Input:**

```
---------------
---------------
---------------
--------smile--
-----------a---
-----------u---
-----------g-h-
-------birthday
-------------p-
-------------p-
-------------y-
---------------
---------------
---------------
---------------
panelyy
```

**Output:**

```
(13,1,true,yay)
```

### Extra notes

- Please don’t use existing libraries designed to solve this problem. You may
  still use common libraries for I/O, data structures etc, just remember the
  core of this problem is making the algorithm yourself
- Words can only read left-to-right and top-to-bottom
- We have provided a dictionary of valid words, `dict.txt`. Please use this,
  without modification
- Whilst scrabble has locations which double or triple your letter or word
  score, assume these don’t exist for this problem
- Additionally, unlike regular scrabble you don’t get a bonus for using all
  your letters
- If there are multiple answers which give the same (best) score, output any
  one of them
- The top left corner of the board has coordinates 0,0

**_Good Luck!_**
