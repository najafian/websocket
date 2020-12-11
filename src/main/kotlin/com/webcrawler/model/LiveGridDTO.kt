package com.webcrawler.model

import java.io.Serializable

class LiveGridDTO : Serializable {
    var c1: String? = null
    var c2: String? = null
    var c3: String? = null
    var c4: Boolean? = null

    override fun toString(): String {
        return "ActivityDTO(c1=$c1, c2=$c2, c3=$c3, c4=$c4)"
    }


}
