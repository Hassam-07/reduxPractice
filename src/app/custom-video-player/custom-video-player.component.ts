import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-custom-video-player',
  templateUrl: './custom-video-player.component.html',
  styleUrls: ['./custom-video-player.component.scss'],
})
export class CustomVideoPlayerComponent {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef;
  @ViewChild('volumeSlider') volumeSlider!: ElementRef;
  @ViewChild('videoContainer') videoContainer!: ElementRef;

  isPlaying = false;
  volumeLevel = 'high';
  playbackRates = [1, 1.25, 1.5, 2]; // Add more speeds if needed
  currentPlaybackRateIndex = 0;
  currentTime = '0:00';
  duration = '0:00';

  ngAfterViewInit(): void {
    this.videoPlayer.nativeElement.addEventListener('timeupdate', () => {
      this.updateTimeDisplay();
    });
    this.videoPlayer?.nativeElement.addEventListener('volumechange', () => {
      this.updateVolume();
    });

    this.videoPlayer.nativeElement.addEventListener('loadedmetadata', () => {
      this.duration = this.formatDuration(
        this.videoPlayer.nativeElement.duration
      );
    });
  }

  togglePlayPause(): void {
    this.isPlaying = !this.isPlaying;
    if (this.isPlaying) {
      this.videoPlayer.nativeElement.play();
      !this.isPlaying;
    } else {
      this.videoPlayer.nativeElement.pause();
    }
  }

  toggleMute(): void {
    this.videoPlayer.nativeElement.muted =
      !this.videoPlayer.nativeElement.muted;
  }
  @HostListener('input', ['$event'])
  onVolumeSliderChange(event: any): void {
    const volumeValue = event.target.value;
    this.videoPlayer.nativeElement.volume = volumeValue;
    this.videoPlayer.nativeElement.muted = volumeValue === '0';

    // Update volume level and apply it to the container dataset
    this.updateVolume();
  }

  updateVolume(): void {
    const volumeLevel = this.calculateVolumeLevel();
    this.videoContainer.nativeElement.dataset.volumeLevel = volumeLevel;
  }

  calculateVolumeLevel(): string {
    if (
      this.videoPlayer.nativeElement.muted ||
      this.videoPlayer.nativeElement.volume === 0
    ) {
      this.volumeSlider.nativeElement.value = 0;
      return 'muted';
    } else if (this.videoPlayer.nativeElement.volume >= 0.5) {
      return 'high';
    } else {
      return 'low';
    }
  }

  // setVolume(volume: number): void {
  //   this.videoPlayer.nativeElement.volume = volume;
  //   this.updateVolumeIcon();
  // }

  // updateVolumeIcon(): void {
  //   if (
  //     this.videoPlayer.nativeElement.muted ||
  //     this.videoPlayer.nativeElement.volume === 0
  //   ) {
  //     this.volumeLevel = 'muted';
  //   } else if (this.videoPlayer.nativeElement.volume >= 0.5) {
  //     this.volumeLevel = 'high';
  //   } else {
  //     this.volumeLevel = 'low';
  //   }
  // }
  changePlaybackSpeed(): void {
    this.currentPlaybackRateIndex =
      (this.currentPlaybackRateIndex + 1) % this.playbackRates.length;
    const newPlaybackRate = this.playbackRates[this.currentPlaybackRateIndex];
    this.videoPlayer.nativeElement.playbackRate = newPlaybackRate;
  }
  updateTimeDisplay(): void {
    this.currentTime = this.formatDuration(
      this.videoPlayer.nativeElement.currentTime
    );
  }
  formatDuration(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  toggleFullScreen(): void {
    if (this.videoPlayer.nativeElement.requestFullscreen) {
      this.videoPlayer.nativeElement.requestFullscreen();
    } else if (this.videoPlayer.nativeElement.mozRequestFullScreen) {
      this.videoPlayer.nativeElement.mozRequestFullScreen();
    } else if (this.videoPlayer.nativeElement.webkitRequestFullscreen) {
      this.videoPlayer.nativeElement.webkitRequestFullscreen();
    } else if (this.videoPlayer.nativeElement.msRequestFullscreen) {
      this.videoPlayer.nativeElement.msRequestFullscreen();
    }
  }
}
