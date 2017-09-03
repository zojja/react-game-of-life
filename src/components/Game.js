import React, { Component } from 'react';
import Cell from './Cell';

class Game extends Component {
    constructor() {
        super();
        this.state = {
            cells: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            ],
            generate: ''
        }
    }

    changeCellState = (row, col) => {
        let newState = this.state.cells.slice();
        newState[row][col] === 0 ?
            newState[row][col] = 1 :
            newState[row][col] = 0;

        this.setState({
            cells: newState
        })
    }

    stateOnNextGen(row, col) {
        const currState = this.state.cells.slice();
        let total_cols = currState[0].length;
        let total_rows = currState.length;

        let livingSiblings = 0;
        let currCell = currState[row][col];

        let iStart = (row - 1 < 0) ? total_rows - 1 : row - 1;
        let iEnd   = (row + 1 > total_rows - 1) ? 0 : row + 1;

        let jStart = (col - 1 < 0) ? total_cols - 1 : col - 1;
        let jEnd   = (col + 1 > total_cols - 1) ? 0 : col + 1;

        let iter = {
            '1': iStart,
            '2': row,
            '3': iEnd
        }

        let jter = {
            '1': jStart,
            '2': col,
            '3': jEnd
        }
        
        for (let i in iter) {
            for (let j in jter) {
                console.log(i, 'i', j, 'j');
                if (iter[i] === row && jter[j] === col) { continue };
                if (currState[iter[i]][jter[j]] === 1) { livingSiblings++ };
            }
        }

        let result;
        if (currCell === 0 && livingSiblings === 3) {
            result = 1;
        } else if ((currCell === 1) && (livingSiblings === 2 || livingSiblings === 3)) {
            result = 1;
        } else {
            result = 0;
        }

        return result;
    }

    nextGen = () => {
        const currState = this.state.cells.slice();
        let newState = currState.map((row, ind) => {
            let currRow = ind;
            return row.map((col, ind) => {
                let currCol = ind;
                return this.stateOnNextGen(currRow, currCol);
            })
        });

        this.setState({
            cells: newState
        });
    }

    breeding = () => {
        let start = setInterval(this.nextGen, 200);

        this.setState({
            generate: start
        });
    }

    stopBreeding = () => {
        clearInterval(this.state.generate);
    }

    addColumn = () => {
        const currState = this.state.cells.slice();
        const newState = currState.map((el, ind) => {
            el.push(0);
            return el;
        });

        this.setState({
            cells: newState
        });
    }

    removeColumn = () => {
        const currState = this.state.cells.slice();
        const newState = currState.map((el, ind) => {
            el.pop();
            return el;
        });

        this.setState({
            cells: newState
        });
    }

    addRow = () => {
        const currState = this.state.cells.slice();
        const total_cols = currState[0].length;

        currState.push(Array(total_cols).fill(0));
        const newState = currState;

        this.setState({
            cells: newState
        });
    }

    removeRow = () => {
        const currState = this.state.cells.slice();
        currState.pop()
        const newState = currState;

        this.setState({
            cells: newState
        });
    }

    renderCells = () => {
        const data = this.state.cells;
        const cells = data.map((el, ind) => {
            let row = ind;
            return (
                <div key={ind}>
                    {el.map((el, ind) => {
                        return (
                            <Cell 
                                data={data[row][ind]} 
                                key={ind}
                                onClick={() => this.changeCellState(row, ind)} 
                            />
                        )
                    })}
                </div>
            )
        });
        return cells;
    }

    render() {
        return (
            <div className="game">
                <div className="game__buttons">
                    <button onClick={() => this.addColumn()}>column +</button>
                    <button onClick={() => this.removeColumn()}>column -</button>
                </div>
                <div className="game__buttons">
                    <button onClick={() => this.addRow()}>row +</button>    
                    <button onClick={() => this.removeRow()}>row -</button>
                </div>
                {this.renderCells()}
                <div className="game__buttons">
                    <button onClick={() => this.breeding()}>start</button>
                    <button onClick={() => this.stopBreeding()}>stop</button>
                </div>
                <button onClick={() => this.nextGen()}>next gen</button>
            </div>
        )
    }
}

export default Game;
