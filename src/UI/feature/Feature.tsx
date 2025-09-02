interface FeatureProps {
  title: string
  content: string
  img : string
}

const Feature : React.FC<FeatureProps> = ({title, content, img}) => {
  return (
    <div className="feature-item">
      <img src={img} alt="Chat Icon" className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{content}</p>
    </div>
  )
}

export default Feature
