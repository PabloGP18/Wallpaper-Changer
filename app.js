import { setWallpaper, getWallpaper } from 'wallpaper'
import { schedule } from 'node-cron'

import os from 'os'
import path from 'path'

const wallpapers = {
  morning: path.join(os.homedir(), 'Documents/Wallpaper-interval/peakpx-2.jpg'),
  noon: path.join(os.homedir(), 'Documents/Wallpaper-interval/peakpx.jpg'),
  between: path.join(os.homedir(), 'Documents/Wallpaper-interval/peakpx-3.jpg'),
  afternoon: path.join(
    os.homedir(),
    'Documents/Wallpaper-interval/peakpx-4.jpg'
  ),
  night: path.join(os.homedir(), 'Documents/Wallpaper-interval/peakpx-5.jpg')
}

// Schedule wallpaper changes for specific time intervals
schedule('0 6 * * *', async function () {
  try {
    console.log('Running morning job')
    await setWallpaper(wallpapers.morning)
    console.log('Morning job completed')
  } catch (error) {
    console.error(error)
  }
})

schedule('0 10 * * *', async function () {
  try {
    console.log('Running noon job')
    await setWallpaper(wallpapers.noon)
    console.log('Noon job completed')
  } catch (error) {
    console.error(error)
  }
})

schedule('0 18 * * *', async function () {
  try {
    console.log('Running between job')
    await setWallpaper(wallpapers.between)
    console.log('Between job completed')
  } catch (error) {
    console.error(error)
  }
})

schedule('30 19 * * *', async function () {
  try {
    console.log('Running afternoon job')
    await setWallpaper(wallpapers.afternoon)
    console.log('Afternoon job completed')
  } catch (error) {
    console.error(error)
  }
})

schedule('0 21 * * *', async function () {
  try {
    console.log('Running night job')
    await setWallpaper(wallpapers.night)
    console.log('Night job completed')
  } catch (error) {
    console.error(error)
  }
})

let desiredWallpaper

// Function to set the desired wallpaper based on the current time
async function setWallpaperBasedOnTime() {
  const now = new Date()
  const hours = now.getHours()

  if (hours >= 6 && hours < 10) {
    desiredWallpaper = wallpapers.morning
  } else if (hours >= 10 && hours < 18) {
    desiredWallpaper = wallpapers.noon
  } else if (hours >= 18 && hours < 19) {
    desiredWallpaper = wallpapers.between
  } else if (hours >= 19 && hours < 21) {
    desiredWallpaper = wallpapers.afternoon
  } else {
    desiredWallpaper = wallpapers.night
  }
}

// Function to check the current wallpaper and set the desired wallpaper if necessary
async function checkWallpaperBasedOnTime() {
  try {
    const currentWallpaper = await getWallpaper()
    if (currentWallpaper !== desiredWallpaper) {
      // Schedule the function to be called every minute to check and set the wallpaper
      // schedule('* * * * *', setWallpaperBasedOnTime)
      // console.log('Setting wallpaper', desiredWallpaper)
      await setWallpaper(desiredWallpaper)
      console.log('Wallpaper set based on time')
    } else {
      // Schedule the function to be called every hour to check the wallpaper
      // schedule('*/5 * * * *', setWallpaperBasedOnTime)
      console.log('Wallpaper is already set, skipping')
    }
  } catch (error) {
    console.error(error)
  }
}

// Call the functions once at startup
setWallpaperBasedOnTime()
checkWallpaperBasedOnTime()
