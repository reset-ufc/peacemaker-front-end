import { toast } from "sonner";

export const useNotification = () => {
  const notifySuccess = (
    title: string,
    description?: string,
    duration = 3000,
  ) => {
    return toast.success(
      <div>
        <h3 className="text-sm font-semibold">{title}</h3>
        {description && <p className="mt-1 text-sm">{description}</p>}
      </div>,
      {
        duration,
      },
    );
  };

  const notifyError = (title: string, description: string, duration = 3000) => {
    return toast.error(
      <div>
        <h3 className="text-sm font-medium">{title}</h3>
        {description && <p className="mt-1 text-sm">{description}</p>}
      </div>,
      {
        duration,
      },
    );
  };

  return { notifySuccess, notifyError };
};
