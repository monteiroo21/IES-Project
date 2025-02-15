import { FormData } from "../api/apiAdmin";
import { aproveForm, changeForm } from "../api/apiAdmin";
import { Dispatch, SetStateAction } from "react";


export const handleForm = async (
    formId: number | FormData,
    forms: FormData[] | null,
    setForms: Dispatch<SetStateAction<FormData[]>> | null,
    state: "accepted" | "declined" | "pending" | "deleted"
) => {
    if (forms && setForms && typeof formId === "number") {
        const form = forms.find((form) => form.id === formId);
        if (!form) {
            console.error("Form not found in array");
            return;
        }
        const updatedForm = { ...form, state };
        try {
            if (state === "accepted") {
                await aproveForm(updatedForm);
            } else if (state === "declined") {
                await changeForm(formId, updatedForm);
            } else if (state === "pending") {
                await changeForm(formId, updatedForm);
            } else if (state === "deleted") {
                await changeForm(formId, updatedForm);
            }
            setForms((prevForms) => prevForms.filter((form) => form.id !== formId));
        } catch (error) {
            console.error(`Failed to ${state} form in array:`, error);
        }
    } else {
        try {
            const updatedForm = { ...(formId as FormData), state: state };
            if (state === "accepted") {
                await aproveForm(updatedForm);
            } else if (state === "declined") {
                await changeForm((formId as FormData).id, updatedForm);
            } else if (state === "pending") {
                await changeForm((formId as FormData).id, updatedForm);
            } else if (state === "deleted") {
                await changeForm((formId as FormData).id, updatedForm);
            }
            console.log(`Form ${state} successfully`);
        } catch (error) {
            console.error(`Failed to ${state} single form:`, error);
        }
    }
};