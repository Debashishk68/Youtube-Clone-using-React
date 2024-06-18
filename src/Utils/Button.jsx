const Button = ({name,className,img,onClick}) => {
    return (
      <button className={className}>
        <div className="flex items-center gap-2"
        onClick={onClick}>
        {img}
          {name}
          </div>
      </button>
    )
  }
  
  export default Button