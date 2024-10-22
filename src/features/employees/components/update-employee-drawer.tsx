import { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage, useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { FC } from 'react';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateEmployee } from '../store/employees.actions';
import type { IEmployee, IRole } from '../types';
import toast from 'react-hot-toast';

const validationSchema = Yup.object({
  email: Yup.string().email('Неверный email').required('Обязательно'),
  password: Yup.string().min(6, 'Минимум 6 символов'),
  roles: Yup.array().of(Yup.string()).required('Обязательно').min(1, 'Выберите хотя бы одну роль'),
});

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  employee: IEmployee | null;
}

const UpdateEmployeeForm: FC<Props> = ({ open, setOpen, employee }) => {
  const { roles } = useAppSelector((state) => state.roles);
  const { isCreatingEmployee } = useAppSelector((state) => state.employees);
  const dispatch = useAppDispatch();
  const form = useFormik({
    initialValues: { email: '', password: '', roles: [] as number[] },
    validationSchema,
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (employee) {
      form.setFieldValue('email', employee.email);
      form.setFieldValue('roles', employee.roles.map(role => role.id));
      form.setValues({ email: employee.email, password: '', roles: employee.roles.map((role: IRole) => role.id) });
    }
  }, [employee]);

  function handleSubmit(values: any) {
    dispatch(updateEmployee({...values, id: employee?.id!}) as any)
      .unwrap()
      .then((res: IEmployee) => {
        if (res.id) {
          toast.success('Сотрудник создан успешно!');
          setOpen(false);
        }
      })
      .catch((error: any) => {
        if (error.message === "Request failed with status code 400") {
          toast.error("Пользователь с таким email уже существует!");
        }
      });
  }

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-50">
      <div className="fixed inset-0 z-20 bg-slate-900/40 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 w-full overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10 pointer-events-none">
            <DialogPanel className="pointer-events-auto w-screen max-w-lg transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
              <div className="flex flex-col h-full py-6 overflow-y-scroll bg-white shadow-xl">
                <div className="px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-base font-semibold leading-6 text-gray-900">
                      Создать сотрудника
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
                <div className="my-4 border-t" />
                <div className="w-full gap-1 px-4">
                  <div className="max-w-full p-4 mx-auto">
                    <Formik
                      initialValues={form.initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleSubmit}
                      enableReinitialize
                    >
                      {({ setFieldValue }) => (
                        <Form className="space-y-4">
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <Field name="email">
                              {({ field }: any) => (
                                <Input {...field} value={form.values.email} onChange={
                                  (e: any) => {
                                    form.setFieldValue('email', e.target.value);
                                  }
                                } />
                              )}
                            </Field>
                            <ErrorMessage name="email" component="div" className="text-sm text-red-600" />
                          </div>
                          <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
                            <Field name="password">
                              {({ field }: any) => (
                                <Input {...field} value={form.values.password}
                                  onChange={
                                    (e: any) => {
                                      form.setFieldValue('password', e.target.value);
                                    }
                                  }
                                />
                              )}
                            </Field>
                            <ErrorMessage name="password" component="div" className="text-sm text-red-600" />
                          </div>
                          <div>
                            <label htmlFor="roles" className="block text-sm font-medium text-gray-700">Роли</label>
                            <Select
                              isMulti
                              options={roles.map(role => ({ value: role.id, label: role.name }))}
                              onChange={(selectedOptions) => form.setFieldValue('roles', selectedOptions.map(option => option.value))}
                              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              value={form.values.roles.map((role: number) => ({ value: role, label: roles.find(r => r.id === role)?.name }))}
                            />
                            <ErrorMessage name="roles" component="div" className="text-sm text-red-600" />
                          </div>
                          <div>
                            <Button isLoading={isCreatingEmployee} type="submit" className="w-full">
                              Создать
                            </Button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default UpdateEmployeeForm;