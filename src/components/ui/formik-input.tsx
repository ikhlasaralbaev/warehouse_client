export const FormikInput = ({
  field,
  form: { touched, errors },
  ...props
}: any) => {
  return (
    <div className="mb-4">
      <input
        {...field}
        {...props}
        className={`w-full p-2 border ${
          touched[field.name] && errors[field.name]
            ? "border-red-500"
            : "border-gray-300"
        } rounded-lg`}
      />
      {touched[field.name] && errors[field.name] && (
        <div className="mt-1 text-sm text-red-500">{errors[field.name]}</div>
      )}
    </div>
  )
}
