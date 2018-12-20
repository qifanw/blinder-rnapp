var MineService = function (httpClient) {
    this.http = httpClient
}


/**
 *@description 成功通过的机构户申请
 *@param {String} uid操作员用户号 id:申请编号 userId:申请人id bankNo:银行代码 
 *bankAccount:银行卡号 companyName:公司名称 unifiedCode:统一社会信用代码
 *@see http://tools.jinhui365.cn/interface/detail?id=784&viewName=%E6%88%90%E5%8A%9F%E9%80%9A%E8%BF%87%E7%9A%84%E6%9C%BA%E6%9E%84%E6%88%B7%E7%94%B3%E8%AF%B7
 */
MineService.prototype.$successPassApply = function (uid) {
    var url = '/organ/user/successPassApply'
    return this.http.$getJson(url, {
        uid: uid
    })
}


/**
 * @description 机构户注册申请及修改
 * @param {String} uid操作员用户号，companyName：机构户名称，unifiedCode：统一社会信用代码,idBeginDate 统一信用代码有效开始日期，
 * idEndDate： 统一信用代码有效截止日期，applyId：机构户申请单编号
 * @see http://tools.jinhui365.cn/interface/detail?id=646
 */
MineService.prototype.$registerApply = function (uid, companyName, unifiedCode, idBeginDate, idEndDate, applyId, password) {
    var url = '/organ/user/saveOrUpdateApply'
    return this.http.$postJson(url, {
        uid: uid,
        companyName: companyName,
        unifiedCode: unifiedCode,
        idBeginDate: idBeginDate,
        idEndDate: idEndDate,
        applyId: applyId || '',
        password: password

    })
}
/**
 * @description 用户管理机构列表（未绑卡，绑卡失败，审核失败，审核中的）
 * @param {String} uid     操作员用户号
 * @see http://tools.jinhui365.cn/interface/detail?id=650
 */
MineService.prototype.$getNotPassApply = function (uid) {
    var url = "/organ/user/notPassApply"
    return this.http.$getJson(url, {
        uid: uid
    })
},

    /**
     * @description 用户管理机构列表（后台审核成功的数据）
     * @param {String} uid     操作员用户号
     * @see http://tools.jinhui365.cn/interface/detail?id=671
     */
    MineService.prototype.$getPassApply = function (uid) {
        var url = '/organ/user/manageOrganizations'
        return this.http.$getJson(url, {
            uid: uid
        })
    },
    /**
       * @description 机构户申请绑卡
       * @param {String} uid     操作员用户号，id:机构户id号，bankNo开户行别，bankAccount：银行卡号：password:工作密码
       * @see http://tools.jinhui365.cn/interface/detail?id=651&viewName=%E6%9C%BA%E6%9E%84%E6%88%B7%E5%BC%80%E6%88%B7%E7%BB%91%E5%8D%A1
       */
    MineService.prototype.$orgaOpenAccount = function (uid, id, bankNo, bankAccount, password) {
        var url = "/organ/user/openAccountApply"
        return this.http.$postJson(url, {
            uid: uid,
            applyId: id,
            bankNo: bankNo,
            bankAccount: bankAccount,
            password: password
        })

    }

/** http://tools.jinhui365.cn/interface/detail?id=46
 * @param {string } cardId 银行卡号（卡号15~19位）
 *
 * @param {string} 机构办卡类型 bindCard
 *
 * */
MineService.prototype.$getBankCardInfo = function (cardId, type) {

    var url = '/offline/checkBankCard'
    return this.http.$postJson(url, {
        cardId: cardId,
        type: type
    })

}
/**
    @description 我的合同
    http://tools.jinhui365.cn/interface/detail?id=728&viewName=%E5%90%88%E5%90%8C%E5%88%97%E8%A1%A8
*/
MineService.prototype.$mine = function () {
    url = "/compact/list"
    return this.http.$getJson(url, {})
}
/*
@description 用户信息（民工汇）
*/
MineService.prototype.$getWokerInfo = function (userId, mghTeamId) {
    url = "/worker/info"
    return this.http.$getJson(url, {
        userId: userId,
        mghTeamId: mghTeamId
    })
}
/*
@description 修改用户信息（民工汇）
*/
MineService.prototype.$postSaveOrUpdate = function (selfAssessment) {
    url = "/worker/saveOrUpdate"
    return this.http.$postJson(url, {
        selfAssessment: selfAssessment
    })
}
/*
@description 获取余额
*/
MineService.prototype.$getBalance = function (dstUserId) {
    url = "/user/getBalance"
    return this.http.$getJson(url, {
        dstUserId: dstUserId
    })
}
/*
@description 合同详情
@param {String} id     标识
@see http://tools.jinhui365.cn/interface/detail?id=729&viewName=%E5%90%88%E5%90%8C%E8%AF%A6%E6%83%85
*/
MineService.prototype.$detail = function (id) {
    url = "/compact/detail"
    return this.http.$getJson(url, {
        id: id,

    })
}
/*
@description 保存  我的角色 ,工种。
@param {String} role     角色:1.建筑工人 2.建筑单位 3.工人&建筑单 workerKindId 工种。    
                nativePlace 	-- 	籍贯   nation 	-- 	民族	address 	-- 	地址
    
            
@see http://tools.jinhui365.cn/mock/setting?interface_id=732
*/
MineService.prototype.$roleupdate = function (role, workerKindId, nativePlace, nation, address) {
    url = "/worker/saveOrUpdate"
    if (role != 0) {
        return this.http.$postJson(url, {
            role: role,
        })
    } else if (workerKindId != 0) {
        return this.http.$postJson(url, {
            workerKindId: workerKindId,
        })
    } else {
        return this.http.$postJson(url, {
            nativePlace: nativePlace,
            nation: nation,
            address: address

        })
    }

}


/*
@description   我的工种
@param {String} currentPage   当前页 pageSize 	 	每页条数
@see http://10.0.0.219:9098/mock/24/worker/kinds
*/
MineService.prototype.$skillchoose = function () {
    url = "/worker/kinds"
    return this.http.$getJson(url, {
        currentPage: 1,
        pageSize: 100
    })
}
/*
@description   合同期限
@param {String} pageNo   当前页 pageSize 	 	每页条数
@see http://10.0.0.219:9098/mock/24/worker/kinds
*/
MineService.prototype.$contractTime = function () {
    url = "/compact/kinds"
    return this.http.$getJson(url, {
        pageNo: 1,
        pageSize: 100
    })
}
/*
@description   取用户已绑定的银行卡
@param {String} sortType  0:我的银行卡（默认）， 1：扫码被扫支付排序
@see http://10.0.0.219:9098/mock/24/worker/kinds
*/
MineService.prototype.$banks = function (sortType) {
    url = "/user/banks/V3"
    return this.http.$getJson(url, {
        sortType: sortType,
    })
}

/*
@description   设置工资卡
@param {String} bankAccount 银行卡号 bankNo 	-- 	银行代码   bankCardToken 	-- 	银行卡标识
@see http://10.0.0.219:9098/mock/24/worker/kinds
*/
MineService.prototype.$salarybankcard = function (bankAccount, bankNo, bankCardToken) {
    url = "/worker/setSalaryBankcard"
    return this.http.$postJson(url, {
        bankAccount: bankAccount,
        bankNo: bankNo,
        bankCardToken: bankCardToken
    })
}
/*
@description 获取协议列表
@param {String} 
@see http://tools.jinhui365.cn/interface/detail?id=634&viewName=%E8%8E%B7%E5%8F%96%E5%8D%8F%E8%AE%AE%E5%88%97%E8%A1%A8
*/
MineService.prototype.$getProtocol = function (type) {
    url = "/api/tools/agreement"
    return this.http.$getJson(url, {
        // type:type
    }

    )
}


/*
@description 是否有新消息
@param {String} 
@see  http://tools-api.jinhui365.cn/mock/9/user/newInfo
*/
MineService.prototype.$getNewInfo = function () {
    url = "/user/newInfo"
    return this.http.$getJson(url, {

    }

    )
}

/*
@description 获取用户消息列表
@param {String} 
@see  http://tools-api.jinhui365.cn/mock/9/user/infoList
*/
MineService.prototype.$getInfolist = function (currentPage, pageCount, mType) {
    url = "/user/infoList"
    return this.http.$getJson(url, {
        currentPage: currentPage,
        pageCount: pageCount,
        mType: mType
    }

    )
}


/*
@description 消息状态修改
@param {String} 
@see  http://tools-api.jinhui365.cn/mock/9/user/infoList
*/
MineService.prototype.$getUpdateInfoStatus = function (infoId) {
    url = "/user/update_infoStat"
    return this.http.$getJson(url, {
        infoId: infoId
    }

    )
}




export default MineService