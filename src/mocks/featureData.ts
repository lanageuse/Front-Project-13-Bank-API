import iconMoney from '../img/icon-money.png'
import iconSecurity from '../img/icon-security.png'
import iconChat from '../img/icon-chat.png'

type Feature = {
    title :string
    content :string
    img :string
}

type FeaturesData = Feature[] 

const featuresData : FeaturesData = [
    {
        title : "You are our #1 priority",
        content : "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.",
        img : iconChat
    },
    {
        title : "More savings means higher rates",
        content : "The more you save with us, the higher your interest rate will be!",
        img : iconMoney
    },
    {
        title : "Security you can trust",
        content : "We use top of the line encryption to make sure your data and money is always safe.",
        img : iconSecurity
    }
]

export default featuresData