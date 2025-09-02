
import Feature from '../UI/feature/Feature';
import featuresData from  '../mocks/featureData'

const FeaturesLayout = () => {
    return (
        <section className="features">
            <h2 className="sr-only">Features</h2>
            {
                featuresData.map((feat) => {
                    return <Feature key={feat.title} title={feat.title}  content={feat.content} img={feat.img} />
                })
            }
        </section>
    );
}

export default FeaturesLayout
