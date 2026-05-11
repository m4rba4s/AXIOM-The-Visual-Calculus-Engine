import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

interface MathDisplayProps {
  formula: string;
  block?: boolean;
}

export const MathDisplay = ({ formula, block = false }: MathDisplayProps) => {
  if (block) {
    return <BlockMath math={formula} />;
  }
  return <InlineMath math={formula} />;
};
