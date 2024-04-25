import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  
  merge(collection1: number[], collection2: number[], collection3: number[]): number[] {
    const result: number[] = [];
    let i = 0;
    let j = collection2.length - 1; // Start from the end of collection2
    let k = collection3.length - 1; // Start from the end of collection3

    while (i < collection1.length || j >= 0 || k >= 0) {
        const val1 = i < collection1.length ? collection1[i] : Number.MIN_SAFE_INTEGER;
        const val2 = j >= 0 ? collection2[j] : Number.MIN_SAFE_INTEGER;
        const val3 = k >= 0 ? collection3[k] : Number.MAX_SAFE_INTEGER;

        const maxVal = Math.max(val1, val2, val3);

        if (maxVal === val1) {
            result.push(collection1[i]);
            i++;
        } else if (maxVal === val2) {
            result.push(collection2[j]);
            j--;
        } else {
            result.push(collection3[k]);
            k--;
        }
    }
    console.log(result)
    return result;
  }
}
