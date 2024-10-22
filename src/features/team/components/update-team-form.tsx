// src/components/TeamForm.js
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/hooks"
import { updateTeamAction } from "../store/team.actions"
import toast from "react-hot-toast"
import { ICreateTeam, ITeam } from "../types"
import { FormikInput } from "@/components/ui/formik-input"
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react"
import { XMarkIcon } from "@heroicons/react/20/solid"

// Validation Schema
const TeamFormSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Team name is too short!")
    .max(50, "Team name is too long!")
    .required("Team name is required"),
  phone: Yup.string().required("Description is required"),
})

interface IUpdateTeamForm {
  setOpen: (open: boolean) => void
  initialData?: ITeam
  open: boolean
}

const UpdateTeamForm = ({ setOpen, initialData, open }: IUpdateTeamForm) => {
  const dispatch = useAppDispatch()

  const updateTeam = (values: ICreateTeam) => {
    dispatch(updateTeamAction({ data: values, id: initialData?.id! }))
      .unwrap()
      .then(() => {
        toast.success("Team created successfully")
        setOpen(false)
      })
      .catch((res) => {
        if (res.message === "Request failed with status code 400") {
          toast.error("Team already exists")
          return
        }
        toast.error("Error creating team")
      })
  }

  return (
    <>
      <Dialog open={open} onClose={setOpen} className={"z-50 relative"}>
        <div className="fixed inset-0 z-20 bg-slate-900/40 backdrop-blur-sm" />

        <div className="fixed inset-0 z-50 w-full overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
              <DialogPanel
                transition
                className="pointer-events-auto w-[320px] transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700 "
              >
                <div className="flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                        Import products
                      </DialogTitle>
                      <div className="flex items-center ml-3 h-7">
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="relative text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          <XMarkIcon aria-hidden="true" className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <Formik
                    initialValues={{
                      fullName: initialData?.fullName ?? "",
                      phone: initialData?.phone ?? "",
                    }}
                    validationSchema={TeamFormSchema}
                    onSubmit={(values, { setSubmitting }) => {
                      updateTeam(values)
                      setSubmitting(false)
                    }}
                  >
                    {({ isSubmitting }) => (
                      <Form className="grid items-start w-full h-full max-w-lg gap-2 p-4 mx-auto rounded-lg">
                        <div className="grid">
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
                          {isSubmitting ? "Submitting..." : "Update Team"}
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default UpdateTeamForm
