type Props = {
    onCheckboxChange: (gender: string) => void
    selectedGender: string
}

const GenderCheckbox = ({ onCheckboxChange, selectedGender }: Props) => {
    return (
        <div className='flex'>
            <div className='form-control'>
                <label
                    htmlFor='male'
                    className={`label gap-2 cursor-pointer ${
                        selectedGender === 'male' ? 'selected' : ''
                    }`}>
                    <span className='label-text'>Male</span>
                    <input
                        type='radio'
                        className='checkbox border-slate-900'
                        id='male'
                        checked={selectedGender === 'male'}
                        onChange={() => onCheckboxChange('male')}
                    />
                </label>
            </div>
            <div className='form-control'>
                <label
                    htmlFor='female'
                    className={`label gap-2 cursor-pointer ${
                        selectedGender === 'female' ? 'selected' : ''
                    }`}>
                    <span className='label-text'>Female</span>
                    <input
                        type='radio'
                        className='checkbox border-slate-900'
                        id='female'
                        checked={selectedGender === 'female'}
                        onChange={() => onCheckboxChange('female')}
                    />
                </label>
            </div>
        </div>
    )
}
export default GenderCheckbox
