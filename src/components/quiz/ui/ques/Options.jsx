/* eslint-disable react/prop-types */
export default function Options({ options }) {
    return (
        <div className="options">
            {
                options.map((opt, index) => (
                    <button className="btn btn-option" key={index}>{opt}</button>
                ))
            }
        </div>
    )
}
