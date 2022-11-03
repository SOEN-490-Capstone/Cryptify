import { titleCase } from '@cryptify/common/src/utils/string_utils';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Pressable } from 'native-base';
import React from 'react';
import { Share } from 'react-native';
import { getCurrencyNameFromTag } from '../services/currency_service';
import { faArrowUpBracketCustom } from './icons/faArrowUpFromBracket';


type Props = {
  currencyType: string,
  address: string,
};

export function AddressShareButton({currencyType, address}: Props) {


  const onShare = async () => {

      await Share.share({
        message:
          `${titleCase(getCurrencyNameFromTag(currencyType))} Wallet Address:\n${address}`,
      });
     
  };
  return (
      <Pressable onPress={onShare}>
        <FontAwesomeIcon icon={faArrowUpBracketCustom} size={22} />
    </Pressable>
  );
};