import { useState, useMemo } from 'react';
import { useBalances } from '../../../../../hooks/use-balances';
import { OrderFormState } from '../types';

interface UseOrderFormProps {
  leverage: string;
}

interface UseOrderFormReturn {
  formState: OrderFormState;
  maxLeveragedAmount: number;
  handleAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleLimitPriceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSliderChange: (value: number[]) => void;
  toggleDirection: () => void;
}

export function useOrderForm({ leverage }: UseOrderFormProps): UseOrderFormReturn {
  const { balances } = useBalances();
  const [formState, setFormState] = useState<OrderFormState>({
    amount: "",
    limitPrice: "",
    sliderValue: [0],
    isLong: true,
  });

  // Calculate max leveraged amount
  const maxLeveragedAmount = useMemo(() => {
    const balance = parseFloat(balances?.formattedMusdBalance || "0");
    return balance * parseFloat(leverage);
  }, [balances?.formattedMusdBalance, leverage]);

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    const newAmount = (maxLeveragedAmount * value[0] / 100).toFixed(2);
    setFormState(prev => ({
      ...prev,
      sliderValue: value,
      amount: newAmount
    }));
  };

  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = e.target.value;
    
    // Update slider value based on amount
    let newSliderValue = [0];
    if (maxLeveragedAmount > 0) {
      const percentage = (parseFloat(newAmount) / maxLeveragedAmount) * 100;
      newSliderValue = [Math.min(100, Math.max(0, percentage))];
    }

    setFormState(prev => ({
      ...prev,
      amount: newAmount,
      sliderValue: newSliderValue
    }));
  };

  // Handle limit price input change
  const handleLimitPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({
      ...prev,
      limitPrice: e.target.value
    }));
  };

  // Toggle between long and short
  const toggleDirection = () => {
    setFormState(prev => ({
      ...prev,
      isLong: !prev.isLong
    }));
  };

  return {
    formState,
    maxLeveragedAmount,
    handleAmountChange,
    handleLimitPriceChange,
    handleSliderChange,
    toggleDirection,
  };
}