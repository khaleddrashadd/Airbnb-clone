'use client';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { useState } from 'react';
import { useInput, useRegisterModal } from '@/hooks';
import { Button, Heading, Input, Modal } from '..';
import { postData } from '@/lib/axios';
import { toast } from 'react-hot-toast';

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(value =>
    /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(value.trim())
  );
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(value => value.trim() !== '');
  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(value => value.trim().length > 5);

  const formIsValid = emailIsValid && nameIsValid && passwordIsValid;

  const handleSubmit = async () => {
    if (!formIsValid) return;

    try {
      setIsLoading(true);
      const res = await postData('/register', data);
    } catch (err) {
      console.log(err.message);
      toast.error(err?.message || 'Something went wrong!', {
        duration: 4000,
      });
    }
    setIsLoading(false);
  };

  const bodyContent = (
    <form className="flex flex-col gap-4">
      <Heading
        title="Welcome to Aitbnb"
        subtitle="Create an account"
      />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        error={emailHasError}
        onChange={emailChangeHandler}
        onBlur={emailBlurHandler}
        value={email}
        errorTitle="Please provide a valid email address."
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        error={nameHasError}
        onChange={nameChangeHandler}
        onBlur={nameBlurHandler}
        value={name}
        errorTitle="Please provide a valid name."
      />
      <Input
        id="password"
        label="Password"
        disabled={isLoading}
        error={passwordHasError}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
        value={password}
        errorTitle="Please provide a valid password."
      />
    </form>
  );

  const footerContent = (
    <div className="flex flex-col gap-4">
      <Button
        Icon={FcGoogle}
        disabled={isLoading}
        label="Continue with Google"
        outline
        onClick={() => {}}
      />
      <Button
        Icon={AiFillGithub}
        disabled={isLoading}
        label="Continue with Github"
        outline
        onClick={() => {}}
      />
      <div>
        <p className="text-center text-gray-500">
          Already have an account?{' '}
          <span
            onClick={() => {
              registerModal.onClose();
              loginModal.onOpen();
            }}
            className="text-rose-500 cursor-pointer hover:underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading || !formIsValid}
      isOpen={registerModal.isOpen}
      title="Register"
      actionLabel="Continue"
      handleSubmit={handleSubmit}
      onClose={registerModal.onClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default RegisterModal;
