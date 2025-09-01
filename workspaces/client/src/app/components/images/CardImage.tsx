import DiplomatImg from '@public/diplomat.png';
import DirectorOfOperationsImg from '@public/director_of_operations.png';
import DiscreetAssistantImg from '@public/discreet_assistant.png';
import DoubleAgentImg from '@public/double_agent.png';
import InformantImg from '@public/informant.png';
import MagnateImg from '@public/magnate.png';
import SecretOperatorImg from '@public/secret_operator.png';
import SecurityAgentImg from '@public/security_guard.png';
import StrategistImg from '@public/strategist.png';
import UndercoverAgentImg from '@public/undercover_agent.png';
import { NAME_CARD } from '@shadow-network/shared/consts/NameCard';
import Image from 'next/image';

type Props = {
  card: string;
};

export default function CardImage({ card }: Props) {
  let imageSrc, altText;

  switch (card) {
    case NAME_CARD.SECRET_OPERATOR:
      imageSrc = SecretOperatorImg;
      altText = 'secret_operator_player_card';
      break;
    case NAME_CARD.SECURITY_AGENT:
      imageSrc = SecurityAgentImg;
      altText = 'security_agent_player_card';
      break;
    case NAME_CARD.INFORMANT:
      imageSrc = InformantImg;
      altText = 'informant_player_card';
      break;
    case NAME_CARD.MAGNATE:
      imageSrc = MagnateImg;
      altText = 'magnate_player_card';
      break;
    case NAME_CARD.DISCREET_ASSISTANT:
      imageSrc = DiscreetAssistantImg;
      altText = 'discreet_assistant_player_card';
      break;
    case NAME_CARD.UNDERCOVER_AGENT:
      imageSrc = UndercoverAgentImg;
      altText = 'undercover_player_card';
      break;
    case NAME_CARD.STRATEGIST:
      imageSrc = StrategistImg;
      altText = 'strategist_player_card';
      break;
    case NAME_CARD.DIRECTOR_OF_OPERATIONS:
      imageSrc = DirectorOfOperationsImg;
      altText = 'director_of_operations_player_card';
      break;
    case NAME_CARD.DIPLOMAT:
      imageSrc = DiplomatImg;
      altText = 'diplomat_player_card';
      break;
    case NAME_CARD.DOUBLE_AGENT:
      imageSrc = DoubleAgentImg;
      altText = 'double_agent_player_card';
      break;
    default:
      return null;
  }

  return <Image src={imageSrc} alt={altText} className="w-16 sm:w-20" />;
}
