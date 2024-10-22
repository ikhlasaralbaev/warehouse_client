// src/components/TeamForm.js
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/hooks"
import { createTeamAction } from "../store/team.actions"
import toast from "react-hot-toast"
import { ICreateTeam } from "../types"
import { FormikInput } from "@/components/ui/formik-input"

// Validation Schema
const TeamFormSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Team name is too short!")
    .max(50, "Team name is too long!")
    .required("Team name is required"),
  phone: Yup.string().required("Description is required"),
})

interface ICreateTeamForm {
  setOpen: (open: boolean) => void
}

const CreateTeamForm = ({ setOpen }: ICreateTeamForm) => {
  const dispatch = useAppDispatch()

  const createTeam = (values: ICreateTeam) => {
    dispatch(createTeamAction(values) as any)
      .unwrap()
      .then(() => {
        toast.success("Team created successfully")
        setOpen(false)
      })
      .catch((res: any) => {
        if (res.message === "Request failed with status code 400") {
          toast.error("Team already exists")
          return
        }
        toast.error("Error creating team")
      })
  }

  return (
    <Formik
      initialValues={{
        fullName: "",
        phone: "",
      }}
      validationSchema={TeamFormSchema}
      onSubmit={(values, { setSubmitting }) => {
        createTeam(values)
        setSubmitting(false)
      }}
    >
      {({ isSubmitting }) => (
        <Form className="grid items-start w-full h-full max-w-lg gap-2 p-4 mx-auto rounded-lg">
          <div className="grid ">
            <Field
              name="fullName"
              type="text"
              placeholder="Fullname"
              component={FormikInput}
            />
            <Field
              name="phone"
              as="textarea"
              placeholder="Phone"
              component={FormikInput}
              rows="4"
            />
          </div>
          <Button
            className="mt-auto"
            size={"sm"}
            type="submit"
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Create Team"}
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default CreateTeamForm
