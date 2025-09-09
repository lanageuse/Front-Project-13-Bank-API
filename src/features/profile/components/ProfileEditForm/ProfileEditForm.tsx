import { useProfileForm } from "../../hooks/useProfileForm"

export const ProfileEditForm = () => {

  const {isUpdating, edited, firstName, lastName, handleChange, handleSubmit, handleCancel, setEdited } = useProfileForm()
  return (
    <>
      {edited ? (
        <form
          onSubmit={e => {
            void handleSubmit(e)
          }}
          className="form-edit"
        >
          <div className="input-container">
            <div className="input-wrapper">
              <input
                type="text"
                value={firstName}
                onChange={handleChange}
                name="firstName"
              />
            </div>
            <div className="input-wrapper">
              <input
                type="text"
                value={lastName}
                onChange={handleChange}
                name="lastName"
              />
            </div>
          </div>
          <div className="button-container">
            <button type="submit" disabled={isUpdating} className="edit-button">
              {isUpdating ? "Updating..." : "Save"}
            </button>
            <button
              type="button"
              className="edit-button"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <button
          className="edit-button"
          onClick={() => {
            setEdited(true)
          }}
        >
          Edit Name
        </button>
      )}
    </>
  )
}
