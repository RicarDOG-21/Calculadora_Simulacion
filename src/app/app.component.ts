import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit() {
    this.init();
  }

  init() {
    const calcSl = document.getElementById('calcSl');
    const calcCl = document.getElementById('calcCl');
    if (calcSl) {
      calcSl.onclick = () => this.calcularSinLimite();
    }
    if (calcCl) {
      calcCl.onclick = () => this.calcularConLimite();
    }
  }

  calcularSinLimite() {
    const lamdaInput = document.getElementById('lamdaSl') as HTMLInputElement;
    const muInput = document.getElementById('muSl') as HTMLInputElement;

    if (lamdaInput && muInput) {
      const lamda = parseFloat(lamdaInput.value);
      const mu = parseFloat(muInput.value);

      const rho = lamda / mu;
      const p0 = 1 - rho;
      const lq = (Math.pow(lamda, 2) / (mu * (mu - lamda))).toFixed(4);
      const ls = (lamda / (mu - lamda)).toFixed(4);
      const wq = (lamda / (mu * (mu - lamda))).toFixed(4);
      const ws = (1 / (mu - lamda)).toFixed(4);

      (document.getElementById('rhoSl') as HTMLElement).textContent = rho.toFixed(4);
      (document.getElementById('p0Sl') as HTMLElement).textContent = p0.toFixed(4);
      (document.getElementById('lqSl') as HTMLElement).textContent = lq;
      (document.getElementById('lsSl') as HTMLElement).textContent = ls;
      (document.getElementById('wqSl') as HTMLElement).textContent = wq;
      (document.getElementById('wsSl') as HTMLElement).textContent = ws;
    }
  }

  calcularConLimite() {
    const lamdaInput = document.getElementById('lamdaCl') as HTMLInputElement;
    const muInput = document.getElementById('muCl') as HTMLInputElement;
    // const cInput = document.getElementById('cCl') as HTMLInputElement;
    const nInput = document.getElementById('nCl') as HTMLInputElement;

    if (lamdaInput && muInput && nInput) {
      const lamda = parseFloat(lamdaInput.value);
      const mu = parseFloat(muInput.value);
      const c = 1; 
      // parseFloat(cInput.value)
      const n = parseFloat(nInput.value);

      const rho = lamda / mu;
      const rhoC = rho / c;

      const poNumerator = 1 + (Math.pow(rho, c) * (1 - Math.pow(rhoC, n - c + 1))) / (this.factorial(c - 1) * (1 - rhoC));
      let poDenominator = 0;
      for (let k = 0; k < c; k++) {
        poDenominator += Math.pow(rho, k) / this.factorial(k);
      }
      poDenominator += (Math.pow(rho, c) * (1 - Math.pow(rhoC, n - c + 1))) / (this.factorial(c) * (1 - rhoC));
      const p0 = (1 / poDenominator).toFixed(4);

      const lq = (((Math.pow(rho, c + 1) / (this.factorial(c - 1) * Math.pow(c - rho, 2))) * (1 - Math.pow(rhoC, n - c + 1) - (n - c + 1) * Math.pow(rhoC, n - c) * (1 - rhoC))) * parseFloat(p0)).toFixed(4);
      const ls = (parseFloat(lq) + rho).toFixed(4);
      const wq = (parseFloat(lq) / lamda).toFixed(4);
      const ws = (parseFloat(ls) / lamda).toFixed(4);

      const lambdaEf = lamda * (1 - parseFloat(p0));
      const lambdaPer = lamda - lambdaEf;

      (document.getElementById('rhoCl') as HTMLElement).textContent = rho.toFixed(4);
      (document.getElementById('p0Cl') as HTMLElement).textContent = p0;
      (document.getElementById('lqCl') as HTMLElement).textContent = lq;
      (document.getElementById('lsCl') as HTMLElement).textContent = ls;
      (document.getElementById('wqCl') as HTMLElement).textContent = wq;
      (document.getElementById('wsCl') as HTMLElement).textContent = ws;
      (document.getElementById('lambdaEfCl') as HTMLElement).textContent = lambdaEf.toFixed(4);
      (document.getElementById('lambdaPerCl') as HTMLElement).textContent = lambdaPer.toFixed(4);
    }
  }

  factorial(n: number): number {
    let fact = 1;
    for (let i = 1; i <= n; i++) {
      fact *= i;
    }
    return fact;
  }
}