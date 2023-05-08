import React from "react";
import { RegisterContext } from "../../../context";
import { IRegisterContext } from "../../../interface";
import { Button } from "../../button";
import { Input } from "../../input";
import { Spacer } from "../../spacer";
import { CREATE_ACCOUNT_STEP } from "../../../enum";

export const CHOOSE_A_PASSWORD = () => {
  const { payload, setPayload, setCurrentStep } = React.useContext(
    RegisterContext
  ) as IRegisterContext;

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Input.Password
        value={payload.password}
        label="Password"
        name="current-password"
        id="current-password"
        type="current-password"
        autoComplete="off"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&*])[A-Za-z\d_!@#$%^&*]{8,}$"
        required={true}
        onChange={(event) => {
          setPayload({
            ...payload,
            password: event.target.value,
          });
        }}
        onInvalid={(event) => {
          if (event.currentTarget.validity.patternMismatch)
            event.currentTarget.setCustomValidity(
              "Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character"
            );
        }}
        onInput={(event) => {
          event.currentTarget.setCustomValidity("");
        }}
      />
      <Spacer direction="vertical" size={16} />
      <Input.Password
        value={payload.confirmPassword}
        onChange={(event) => {
          setPayload({
            ...payload,
            confirmPassword: event.target.value,
          });
          if (event.currentTarget.value !== payload.password) {
            event.currentTarget.setCustomValidity("Passwords do not match");
          } else {
            event.currentTarget.setCustomValidity("");
          }
        }}
        label="Confirm Password"
        name="confirm-password"
        id="confirm-password"
        type="password"
        autoComplete="off"
        pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_!@#$%^&*])[A-Za-z\d_!@#$%^&*]{8,}$"
        required={true}
      />
      <Spacer direction="vertical" size={16} />
      <div className="row">
        <Button.SecondaryOutline
          onClick={() => setCurrentStep(CREATE_ACCOUNT_STEP.YOUR_DETAILS)}
        >
          Back
        </Button.SecondaryOutline>
        <Spacer size={48} direction="horizontal" />
        <Button.Primary>Create account</Button.Primary>
      </div>
    </form>
  );
};
