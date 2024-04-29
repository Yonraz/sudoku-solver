import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { Solver } from '../api/solver';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { SolverResponse } from '../types/solverTypes';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CellComponent, LoadingSpinnerComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  errors: string[] | null = null;
  solver: Solver | null = null;
  ngOnInit(): void {
    this.solver = new Solver();
  }
  @Input() board: number[][] = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
  solveMessage: string | null = null;

  onCellUpdate(i: number, j: number, value: number) {
    this.board[i][j] = value;
  }
  async onSolve() {
    try {
      this.solveMessage = null;
      const res: SolverResponse = await this.solver!.trySolveAsync(this.board);
      if (res.isSolved) {
        this.board = res.board;
      }
      this.solveMessage = res.message;
    } catch (err: any) {
      this.errors = [err.message];
    }
  }
}
