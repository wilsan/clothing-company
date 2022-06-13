import './form-input.styles.jsx';
import { FormInputLabel, Input, Group } from './form-input.styles.jsx';

function FormInput({ label, ...otherProps }) {

   return (
      <Group>
         <Input {...otherProps} />
         {/* do not render label if null */}
         {label && (
            <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
         )}
      </Group>
   );
}

export default FormInput;
