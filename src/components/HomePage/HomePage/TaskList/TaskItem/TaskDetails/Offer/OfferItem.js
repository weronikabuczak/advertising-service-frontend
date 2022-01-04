import {useAppDispatch} from "../../../../../../../root";
import {Button, Card, Icon, Image} from "semantic-ui-react";
import {useEffect, useState} from "react";
import {
    getCurrentOfferId,
    getUpdateSuccess,
    setCurrentOfferId,
    updateOffer
} from "../../../../../../../store/offer";
import profile from '../../../../../../../files/profile.jpg'
import {useSelector} from "react-redux";
import {getUserToken} from "../../../../../../../store/auth";
import classes from './OfferItem.module.css';

const OfferItem = ({offer}) => {
    const dispatch = useAppDispatch();
    const token = useSelector(getUserToken);
    const offerId = useSelector(getCurrentOfferId);
    const updateSuccess = useSelector(getUpdateSuccess);
    const [offerAccepted, setOfferAccepted] = useState();
    const [offerRejected, setOfferRejected] = useState();

    useEffect(() => {

    }, [offerAccepted, offerRejected]);

    const acceptOffer = () => {
        dispatch(setCurrentOfferId(offer.id));
        console.log(offerId)
        if (token) {
            dispatch(updateOffer({token, offerId, offerStatus: 'ACCEPTED'}));
        }
        console.log(updateSuccess)
        // if (updateSuccess) {
        setOfferAccepted(true);
        // }

    }

    const rejectOffer = () => {
        dispatch(setCurrentOfferId(offer.id));
        console.log(updateSuccess)
        console.log(offerId)
        if (token) {
            dispatch(updateOffer({token, offerId, offerStatus: 'REJECTED'}));
        }
        // if (updateSuccess) {
        setOfferRejected(true);
        // }

    }

    return (
        <section>
            {!updateSuccess &&
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
                                {/*PUT offer, status=accepted*/}
                                Zatwierdź
                            </Button>
                            <Button basic color='red' onClick={rejectOffer}>
                                {/*PUT offer, status=rejected*/}
                                Odrzuć
                            </Button>
                        </div>

                    </Card.Content>
                </Card>
            }
            {(offerAccepted || offerRejected) &&
            <div className={classes.offerInfo__card} fluid>{offerAccepted &&
                <p>Propozycja została zatwierdzona!</p>}
                {offerRejected &&
                    <p>Propozycja została odrzucona.</p>}
            </div>
            }
        </section>
    );
};

export default OfferItem;