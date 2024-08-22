// src/TicTacToe.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handlePress = (index) => {
    const newBoard = board.slice();
    if (calculateWinner(newBoard) || newBoard[index]) return;
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(board);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
    Alert.alert('Game Over', `${winner} wins!`);
  } else if (!board.includes(null)) {
    status = 'Draw!';
    Alert.alert('Game Over', 'It\'s a draw!');
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const renderSquare = (index) => (
    <TouchableOpacity
      style={[styles.square, winner && winner.includes(index) ? styles.winnerSquare : null]}
      onPress={() => handlePress(index)}
    >
      <Text style={[styles.squareText, winner && winner.includes(index) ? styles.winnerText : null]}>{board[index]}</Text>
    </TouchableOpacity>
  );

  const renderLine = () => {
    if (!winner) return null;
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return (
          <View style={[styles.line, getLineStyle(i)]} />
        );
      }
    }
  };

  const getLineStyle = (lineIndex) => {
    const lineStyles = [
      { top: 50, height: 5, width: '100%' },   // Horizontal top
      { top: 150, height: 5, width: '100%' },  // Horizontal middle
      { top: 250, height: 5, width: '100%' },  // Horizontal bottom
      { left: 50, width: 5, height: '100%' },  // Vertical left
      { left: 150, width: 5, height: '100%' }, // Vertical middle
      { left: 250, width: 5, height: '100%' }, // Vertical right
      { top: 50, left: 50, width: 5, height: 270, transform: [{ rotate: '45deg' }] }, // Diagonal
      { top: 50, left: 250, width: 5, height: 270, transform: [{ rotate: '-45deg' }] }, // Anti-Diagonal
    ];
    return lineStyles[lineIndex];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.status}>{status}</Text>
      <View style={styles.board}>
        {[0, 1, 2].map((row) => (
          <View key={row} style={styles.row}>
            {[0, 1, 2].map((col) => renderSquare(row * 3 + col))}
          </View>
        ))}
        {renderLine()}
      </View>
      <TouchableOpacity style={styles.button} onPress={resetGame}>
        <Text style={styles.buttonText}>Reset Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i];
    }
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  status: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  board: {
    flexDirection: 'column',
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#333',
    backgroundColor: '#fff',
  },
  squareText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#008CBA',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  winnerSquare: {
    backgroundColor: '#e0f7fa',
  },
  winnerText: {
    color: '#00796b',
  },
  line: {
    position: 'absolute',
    backgroundColor: 'green',
    zIndex: 1,
  },
});

export default TicTacToe;
