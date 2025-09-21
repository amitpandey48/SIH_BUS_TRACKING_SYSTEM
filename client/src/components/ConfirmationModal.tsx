import { useAppContext } from "../App";

export default function ConfirmationModal() {
  try {
    const { modalVisible, modalMessage, hideModal } = useAppContext();
    
    if (!modalVisible) return null;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-card rounded-xl p-6 max-w-sm w-full shadow-2xl border border-border">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto flex items-center justify-center">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground">Booking Confirmed!</h3>
            <p className="text-muted-foreground">{modalMessage}</p>
            <button 
              onClick={hideModal}
              data-testid="button-modal-close"
              className="w-full btn-primary py-3 px-4 rounded-lg font-semibold"
            >
              Great!
            </button>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    // Return null if context is not available yet
    return null;
  }
}
