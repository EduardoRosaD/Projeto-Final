function markPhone(phone) {
    if ( phone !== undefined){
    phone = phone.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
    phone = !phone[2] ? phone[1] : '(' + phone[1] + ') ' + phone[2] + (phone[3] ? '-' + phone[3] : '');
    return phone
    }else{
        return ''
    }

}

export default markPhone