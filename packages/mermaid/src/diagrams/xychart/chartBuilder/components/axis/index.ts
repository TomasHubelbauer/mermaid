import type { SVGGType } from '../../../xychartDb.js';
import type {
  AxisDataType,
  ChartComponent,
  XYChartAxisThemeConfig,
  XYChartAxisConfig,
} from '../../Interfaces.js';
import { isBandAxisData } from '../../Interfaces.js';
import { TextDimensionCalculatorWithFont } from '../../TextDimensionCalculator.js';
import { BandAxis } from './BandAxis.js';
import { LinearAxis } from './LinearAxis.js';

export type AxisPosition = 'left' | 'right' | 'top' | 'bottom';

export interface Axis extends ChartComponent {
  getScaleValue(value: string | number): number;
  setAxisPosition(axisPosition: AxisPosition): void;
  getAxisOuterPadding(): number;
  getTickDistance(): number;
  recalculateOuterPaddingToDrawBar(): void;
  setRange(range: [number, number]): void;
}

export function getAxis(
  data: AxisDataType,
  axisConfig: XYChartAxisConfig,
  axisThemeConfig: XYChartAxisThemeConfig,
  tmpSVGGElem: SVGGType
): Axis {
  const textDimansionCalculator = new TextDimensionCalculatorWithFont(tmpSVGGElem);
  if (isBandAxisData(data)) {
    return new BandAxis(
      axisConfig,
      axisThemeConfig,
      data.categories,
      data.title,
      textDimansionCalculator
    );
  }
  return new LinearAxis(
    axisConfig,
    axisThemeConfig,
    [data.min, data.max],
    data.title,
    textDimansionCalculator
  );
}
