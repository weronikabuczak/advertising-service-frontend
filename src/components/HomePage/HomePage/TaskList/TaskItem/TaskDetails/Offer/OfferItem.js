import {useAppDispatch} from "../../../../../../../root";
import {Button, Card, Icon, Image} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {
    setCurrentOfferId,
    updateOffer
} from "../../../../../../../store/offer";
import profile from '../../../../../../../files/profile.jpg'
import {useSelector} from "react-redux";
import {getUserToken} from "../../../../../../../store/auth";
import classes from './OfferItem.module.css';

const OfferItem = ({offer, isUserTasks}) => {
    const dispatch = useAppDispatch();
    const token = useSelector(getUserToken);
    const [offerAccepted, setOfferAccepted] = useState(false);
    const [offerRejected, setOfferRejected] = useState(false);


    const acceptOffer = (event) => {
        if (token) {
            dispatch(updateOffer({token, offerId: offer.id, offerStatus: 'ACCEPTED'}));
        }
        setOfferAccepted(true);
        //todo
    }

    const rejectOffer = () => {
        if (token) {
            dispatch(updateOffer({token, offerId: offer.id, offerStatus: 'REJECTED'}));
        }
        setOfferRejected(true);
    }

    return (
        <section>
            {isUserTasks &&
                <Card fluid>
                    <Card.Content>
                        {offer.user.image != null
                            ? <Image src={offer.user.image} rounded size='tiny' floated='right'/>
                            //todo get image
                            :
                            <Image src={profile} rounded size='tiny' floated='right'/>
                        }

                        <Card.Header>Propozycja od użytkownika:</Card.Header>
                        <Card.Content>{offer.user.name}</Card.Content>
                        <Card.Content><Icon name='home'/>{offer.user.location}</Card.Content>
                        <Card.Content><Icon name='phone'/>{offer.user.phoneNumber}</Card.Content>
                        <Card.Content><Icon name='mail'/>{offer.user.email}</Card.Content>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button basic color='green' onClick={acceptOffer}>
                                Zatwierdź
                            </Button>
                            <Button basic color='red' onClick={rejectOffer}>
                                Odrzuć
                            </Button>
                        </div>

                    </Card.Content>
                </Card>
            }
            {(offerAccepted || offerRejected) &&
                <div className={classes.offerInfo__card}>
                    {offerAccepted &&
                    <p>Propozycja została zatwierdzona!</p>}
                    {offerRejected &&
                        <p>Propozycja została odrzucona.</p>}
                </div>
            }
        </section>
    );
};

export default OfferItem;