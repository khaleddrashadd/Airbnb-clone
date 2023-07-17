'use client';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { useState } from 'react';
import { useInput, useModal } from '@/hooks';
import { Button, Heading, Input, Modal } from '..';
import { postData } from '@/lib/axios';
import { toast } from 'react-hot-toast';
import { signIn } from 'next-auth/react';
const RegisterModal = () => {
  const modal = useModal();
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

    const data = {
      email,
      name,
      password,
    };

    try {
      setIsLoading(true);
      const res = await postData('/register', data);
      console.log(res);
      res?.statusText === 'OK' &&
        toast.success('Account created successfully!', {
          duration: 4000,
        });
    } catch (err) {
      console.log(err.message);
      toast.error(err?.message || 'Something went wrong!', {
        duration: 4000,
      });
    }
    setIsLoading(false);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
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
        type="password"
        label="Password"
        disabled={isLoading}
        error={passwordHasError}
        onChange={passwordChangeHandler}
        onBlur={passwordBlurHandler}
        value={password}
        errorTitle="Please provide a valid password."
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4">
      <Button
        Icon={FcGoogle}
        disabled={isLoading}
        label="Continue with Google"
        outline
        onClick={e => {
          e.preventDefault();
          signIn('google');
        }}
      />
      <Button
        Icon={AiFillGithub}
        disabled={isLoading}
        label="Continue with Github"
        outline
        onClick={e => {
          e.preventDefault();
          signIn('github');
        }}
      />
      <div>
        <p className="text-center text-gray-500">
          Already have an account?{' '}
          <span
            onClick={() => {
              modal.registerOnClose();
              modal.loginOnOpen();
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
      isOpen={modal.registerIsOpen}
      title="Register"
      actionLabel="Continue"
      handleSubmit={handleSubmit}
      onClose={modal.registerOnClose}
      body={bodyContent}
      footer={footerContent}
    />
  );
};
export default RegisterModal;
