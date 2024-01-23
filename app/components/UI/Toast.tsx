import toast from 'react-hot-toast';

type ToastType = {
    message: string;
    type: string;
    t: Record<string, any>;
}

const Toast = ({ message, type, t}: ToastType) => {
    function handleDismiss() {
        toast.remove(t.id);
    }

    return (
      <div
        className={`max-w-md w-full bg-white rounded-lg pointer-events-auto flex outline outline-1 outline-whitish_border transition-all duration-300`}
        onClick={handleDismiss}
      >
        <div className="flex-1 w-0 px-4 py-6 h-full">
          <div className="flex items-start h-full gap-x-1">
            <div className="ml-3 flex-1">
              <p className={`text-zinc-900" font-bold tracking-wide`}>
                {type}
              </p>
              <p className={`text-sm text-gray-500`}>
                {message}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Toast;