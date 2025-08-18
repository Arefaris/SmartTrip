import useStore from '../../store/store';
import { MultiSelect } from '@mantine/core';
import "./style.css"

export default function InterestSelector() {
  const { plan, setPlan, interests } = useStore()
  
  const handleChange = (selectedValues: string[]) => {
    setPlan({
      ...plan,
      interests: selectedValues
    })
  }

  return (
    <MultiSelect
      label="What are your interests? (Up to 3)"
      placeholder="Travel interests"
      data={interests}
      value={plan.interests}
      onChange={handleChange}
      maxDropdownHeight={200}
      className="interests-selector"
      maxValues={3}
    />
  );
}