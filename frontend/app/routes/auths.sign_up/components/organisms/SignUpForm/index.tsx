import { useEffect, useState } from 'react';
import { PhaseType } from '../../../types';
import { SignUpConfirmation } from '../SignUpConfirmation';
import { SignUpInput } from '../SignUpInput';
import { SignUpThanks } from '../SignUpThanks';
import { ActionFunctionArgs, json } from '@remix-run/node';
import { SignUpDto, ValidateSignUpResponseDto } from '~/generated/auth/@types';
import { postSignUp, postValidateSignUp } from '~/apis/authApi';
import { useActionData } from '@remix-run/react';

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const formData = await request.formData();
//   if (!formData.has('action')) {
//     throw new Error('invalid form post');
//   }

//   const postData: SignUpDto = {
//     name: (formData.get('name') as string) ?? '',
//     email: (formData.get('email') as string) ?? '',
//     password: (formData.get('password') as string) ?? '',
//     passwordConfirm: (formData.get('password_confirm') as string) ?? '',
//   };
//   const action = formData.get('action');
//   switch (action) {
//     case 'validate':
//       const validateSignUpResponse = await postValidateSignUp(postData);
//       return json({ signUpInput: postData, errors: validateSignUpResponse.errors });
//     case 'back':
//       return json({ signUpInput: postData, errors: {} });
//     case 'register':
//       await postSignUp(postData);
//       break;
//   }
// };

const INITIAL_SIGN_UP_INPUTS = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

export const SignUpForm = () => {
  const [phase, setPhase] = useState<PhaseType>('input');
  const [signUpInput, setSignUpInput] = useState<SignUpDto>(INITIAL_SIGN_UP_INPUTS);

  const actionData = useActionData<{ signUpInput: SignUpDto; errors: ValidateSignUpResponseDto }>();

  useEffect(() => {
    setSignUpInput(actionData?.signUpInput ?? INITIAL_SIGN_UP_INPUTS);
    if (Object.keys(actionData?.errors ?? {}).length > 0) return;

    // バリデーションエラーがなければ、次の画面へ遷移
    switch (phase) {
      case 'input':
        setPhase('confirmation');
        break;
      case 'confirmation':
        setPhase('thanks');
        break;
    }
  }, [actionData]);

  const phaseComponent = () => {
    switch (phase) {
      case 'input':
        return (
          <SignUpInput
            signUpInput={signUpInput}
            validationErrors={actionData?.errors ?? { errors: {} }}
          />
        );
      case 'confirmation':
        return <SignUpConfirmation signUpInput={signUpInput} />;
      case 'thanks':
        return <SignUpThanks />;
    }
  };

  return <>{phaseComponent()}</>;
};
