package com.webcrawler.service

import com.webcrawler.model.LiveGridDTO
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.messaging.simp.SimpMessageSendingOperations
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import kotlin.math.roundToInt

@Service
class CallWSWithScheduler @Autowired constructor(private val messagingTemplate: SimpMessageSendingOperations) {
    @Scheduled(fixedRate = 10000)
    fun run() {
        val activityDTOs = ArrayList<LiveGridDTO>()
        for (x in 0..100) {
            val activityDTO = LiveGridDTO()
            activityDTO.c1 = "time"
            activityDTO.c2 = (Math.random() * 100).toString()
            activityDTO.c3 = (Math.random() * 100).toString()
            activityDTO.c4 = (Math.random() * 10).roundToInt() % 2 == 0

            activityDTOs.add(activityDTO)
        }
        messagingTemplate.convertAndSend("/topic/tracker", activityDTOs)
    }
}
